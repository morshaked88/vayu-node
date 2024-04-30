import { db } from "../src/utils/db.server";

async function main() {
  // Create groups
  const groupA = await db.group.create({
    data: { name: "Maccabi Tel-Aviv", isEmpty: false },
  });

  const groupB = await db.group.create({
    data: { name: "Hapoel Tel-Aviv", isEmpty: false },
  });

  // Create users independently
  const avi = await db.user.create({
    data: { name: "Avi", email: "avi@example.com", status: "active" },
  });

  const yoav = await db.user.create({
    data: { name: "Yoav", email: "yoav@example.com", status: "pending" },
  });

  const aviv = await db.user.create({
    data: { name: "Aviv", email: "aviv@example.com", status: "blocked" },
  });

  // Connect users to groups
  await db.group.update({
    where: { id: groupA.id },
    data: { users: { connect: [{ id: avi.id }, { id: aviv.id }] } },
  });

  await db.group.update({
    where: { id: groupB.id },
    data: { users: { connect: [{ id: yoav.id }] } },
  });
}

main();
