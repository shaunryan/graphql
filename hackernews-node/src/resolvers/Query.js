

async function feed(parent, args, context, info) {
    const where = args.filter
      ? {
        OR: [
          { description: { contains: args.filter }},
          { url: { contains: args.filter}},
        ]
      }
      : {}

    const links = await context.prisma.link.findMany({
      where,
      skip: args.skip,
      take: args.take,
      take: args.orderBy,
    })

    const count = await context.prisma.link.count({ where })

    return {
      links,
      count,
    }

}

async function link(parent, args, context) {
    return await context.prisma.link.findOne({
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

