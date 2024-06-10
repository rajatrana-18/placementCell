import mongoose, { mongo } from 'mongoose';
import { EmployeeSchema } from './user.schema.js';

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

export default class EmployeeRepository {


    async signUp(name, email, password) {
        try {
            // Check if an employee with the given email already exists in the database
            const findEmail = await EmployeeModel.findOne({ email: email });
            // If no employee with that email exists, create a new employee
            if (!findEmail) {
                const newEmpData = new EmployeeModel({ name, email, password });
                await newEmpData.save();
                return newEmpData;  // return the newly created employee
            }
        } catch (err) {
            throw new Error("Something went wrong with the employee database");
        }
    }



    async signIn(email) {
        try {
            // find and return the user with a matching email id.
            const user = await EmployeeModel.findOne({ email: email });
            if (user) {
                return user;
            } else {
                throw new Error("User not found");
            }

        } catch (err) {
            throw new Error("Something went wrong with the employee database.");
        }
    }
}