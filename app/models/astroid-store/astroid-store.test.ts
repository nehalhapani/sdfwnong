import { AstroidStoreModel } from "./astroid-store"

test("can be created", () => {
  const instance = AstroidStoreModel.create({})

  expect(instance).toBeTruthy()
})
