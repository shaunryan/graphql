const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function vote(parent, args, context, info){

  const userId = getUserId(context)

  const vote = await context.prisma.vote.findOne({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId: userId
      }
    }
  })

  if (Boolean(vote)) {
    throw new Error(`Already voted for the link: ${args.linkId}`)
  }

  const newVote = await context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) }},
    }
  })
  await context.pubsub.publish("NEW_VOTE", newVote)

  return newVote
}

async function signup(parent, args, context, info) {

    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.user.create(
        {
            data: {
                ...args, password
            }
        }
    )
    const token = jwt.sign({userId: user.id}, APP_SECRET)
    return {
        token,
        user,
    }

}


async function login(parent, args, context, info) {

    const user = await context.prisma.user.findOne({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }
  

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
      token,
      user,
    }
  }


async function post(parent, args, context, info) {
    
    const userId = getUserId(context)
  
    const newLink = await context.prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
      }
    })
    await context.pubsub.publish("NEW_LINK", newLink)

    return newLink
  }

async function updateLink(parent, args, context)
{
    return await context.prisma.link.update({
        where: {
            id: Number(args.id)
        },
        data: {
            url: args.url,
            description: args.description
        }
    })
}

async function deleteLink(parent, args, context)
{
    return await context.prisma.link.delete({
        where: {
            id : Number(args.id)
        }
    })
}


module.exports = {
    signup,
    login,
    post,
    updateLink,
    deleteLink,
    vote,
}