npm install @prisma/cli --save-dev

mkdir prisma
touch prisma/schema.prisma

npx prisma migrate save --experimental

npx prisma migrate up --experimental

npx prisma generate

npx prisma studio
