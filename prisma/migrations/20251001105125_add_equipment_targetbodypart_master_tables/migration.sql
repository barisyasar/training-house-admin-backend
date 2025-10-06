-- CreateTable
CREATE TABLE "equipments" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "target_body_parts" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "target_body_parts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exercise_equipments" ADD CONSTRAINT "exercise_equipments_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_target_body_parts" ADD CONSTRAINT "exercise_target_body_parts_targetBodyPartId_fkey" FOREIGN KEY ("targetBodyPartId") REFERENCES "target_body_parts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
