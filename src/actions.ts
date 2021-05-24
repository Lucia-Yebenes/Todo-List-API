import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { Todolist } from './entities/Todolist'

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.first_name) throw new Exception("Please provide a first_name")
    if (!req.body.last_name) throw new Exception("Please provide a last_name")
    if (!req.body.email) throw new Exception("Please provide an email")
    if (!req.body.password) throw new Exception("Please provide a password")

    const userRepo = getRepository(Users)
    // fetch for any user with this email
    const user = await userRepo.findOne({ where: { email: req.body.email } })
    if (user) throw new Exception("Users already exists with this email")

    const newUser = getRepository(Users).create(req.body);  //Creo un usuario
    const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
    return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).find();
    return res.json(users);
}

export const getOneUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).findOne(req.params.id);
    return res.json(users);
}
//eliminar usuario
export const deleteUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).findOne(req.params.id);
    if (!users) {
        return res.json({ "message": "the user not find" })
    } else {
        const results = await getRepository(Todolist).delete({users:users})
        const result = await getRepository(Users).delete(req.params.id);
        return res.json(result);
    }
}

export const createUserTask = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.label) throw new Exception("Please provide a label")
    const UserTask = getRepository(Users) //busco usuario
    const userTasks = await UserTask.findOne({ where: { id: req.params.id } })
    if (userTasks) {
        const newUserTask = getRepository(Todolist).create({ label: req.body.label, users:userTasks, done: false });  //Creo una tarea  
        const results = await getRepository(Todolist).save(newUserTask); //gurdo la tarea 
        return res.json(results);
    } else {
        return res.json("Error");
    }
}

export const getUserTask = async (req: Request, res: Response): Promise<Response> => {
    const todolists = await getRepository(Todolist).findOne(req.params.id);
    return res.json(todolists);
}

export const upDataTask = async (req: Request, res: Response): Promise<Response> => {
    const task = await getRepository(Todolist).findOne(req.params.id);
    if (task) {
        getRepository(Todolist).merge(task, req.body)
        const results = await getRepository(Todolist).save(task)
        return res.json(results);
    }
    return res.json("Not task found");
}
