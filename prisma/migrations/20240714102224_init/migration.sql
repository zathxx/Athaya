-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "rating" REAL NOT NULL
);
