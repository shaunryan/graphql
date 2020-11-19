rm -rf ./prisma/migrations
rm -f ./prisma/dev.db
npx prisma migrate save --experimental
npx prisma migrate up --experimental
npx prisma generate
npx prisma studio