-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PokemonToType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PokemonToType_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE INDEX "_PokemonToType_B_index" ON "_PokemonToType"("B");

-- AddForeignKey
ALTER TABLE "_PokemonToType" ADD CONSTRAINT "_PokemonToType_A_fkey" FOREIGN KEY ("A") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToType" ADD CONSTRAINT "_PokemonToType_B_fkey" FOREIGN KEY ("B") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
