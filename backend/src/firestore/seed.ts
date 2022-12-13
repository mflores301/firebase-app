// internal imports
import {context} from "./index";
import {getMockApiUsersData} from "./utilities/mock-data";

const main = async () => {
  try {
    const haveDocuments =
    (await context.collection("users").listDocuments()).length;
    if (haveDocuments) return;

    const users = await getMockApiUsersData();

    console.info("..... Inserting Seed Data .....");
    for (const user of users) {
      await context.collection("users").doc(String(user.id)).create(user);
    }
    console.info("..... Seed Data Inserted .....");
  } catch (error: any) {
    console.error("..... Error Seeding DB .....", error);
  }
};

main();
