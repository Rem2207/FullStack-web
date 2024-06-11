import { Router } from "express"
import userRoutes from "./user-routes.js"
import accessoriesRoutes from "./accessories-routes.js"
import plushiesRoutes from "./plushies-routes.js"

const appRouter = Router()
appRouter.use("/user",userRoutes)
appRouter.use("/accessories",accessoriesRoutes)
appRouter.use("/plushies",plushiesRoutes)

export default appRouter