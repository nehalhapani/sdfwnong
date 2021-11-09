import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"
import { getRandom } from "../../utils/random"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api
api.setup()
export const AstroidStoreModel = types
  .model("AstroidStore")
  .props({
    astroidID: types.optional(types.string,''),
    astroidData: types.optional(types.frozen(),{})
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setAstroidID(value:string){
      self.astroidID = value
    },
    getAstroidDetail: flow(function* getAstroidDetail() {
      let respose = yield api.getAstroiddata(self.astroidID)
      if(respose.kind == 'ok'){
        self.astroidData = respose.data
        return true
      } else {
        return false
      }
    }),
    getRandomAstroidDetail: flow(function* getRandomAstroidDetail() {
      let respose = yield api.getRandomAstroid()
      if(respose.kind == 'ok'){
        let data = getRandom(0, respose.data.near_earth_objects.length)
        console.tron.log('number',data)
        self.astroidID = respose.data.near_earth_objects[data].id
        return true
      } else {
        return false
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type AstroidStoreType = Instance<typeof AstroidStoreModel>
export interface AstroidStore extends AstroidStoreType {}
type AstroidStoreSnapshotType = SnapshotOut<typeof AstroidStoreModel>
export interface AstroidStoreSnapshot extends AstroidStoreSnapshotType {}
export const createAstroidStoreDefaultModel = () => types.optional(AstroidStoreModel, {})
