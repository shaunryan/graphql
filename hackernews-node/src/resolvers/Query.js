

function feed(parent, args, context, info) {
    return context.prisma.link.findMany()
}

function link(parent, args, context) {
    return context.prisma.link.findOne({
      where: {
        id: Number(args.id)
      }
    })
}


module.exports = {
  feed,
  link,
}


// info: () => `This is the API of a Hackernews Clone`,

