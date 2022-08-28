/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { createUser } from '../../api';
// import { notify } from '../ui/toast';
// import { Checkbox } from '../ui/checkbox';

// interface Action {
//   type: ActionKind;
//   payload: number | string | boolean;
// }

// enum ActionKind {
//   firstName = 'firstName',
//   lastName = 'lastName',
//   company = 'company',
//   email = 'email',
//   phone = 'phone',
//   password = 'password',
//   confirmPassword = 'confirmPassword',
//   isAdmin = 'isAdmin',
// }

// interface IFormState {
//   [ActionKind.firstName]: string;
//   [ActionKind.lastName]: string;
//   [ActionKind.company]: string;
//   [ActionKind.email]: string;
//   [ActionKind.phone]: string;
//   [ActionKind.password]: string;
//   [ActionKind.confirmPassword]: string;
//   [ActionKind.isAdmin]: boolean;
// }

// const initialCounterState: IFormState = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   company: '',
//   phone: '',
//   password: '',
//   confirmPassword: '',
//   isAdmin: false,
// };

// const formReducer = (state: IFormState, event: Action): IFormState => ({
//   ...state,
//   [event.type]: event.payload,
// });

// // interface UserCreateProps {
// //   type: 'NEW' | 'UPDATE';
// //   initialUser: IUser;
// // }

// export const UserCreate: React.FC = () => {
//   const [formData, setFormData] = useReducer(formReducer, initialCounterState);

//   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     // const pass = faker.name.firstName();
//     // const a = {
//     //   firstName: faker.name.firstName(),
//     //   lastName: faker.name.lastName(),
//     //   email: faker.internet.email(),
//     //   company: faker.company.companyName(),
//     //   phone: faker.phone.number('5## ### ####'),
//     //   password: pass,
//     //   confirmPassword: pass,
//     //   isAdmin: formData.isAdmin,
//     // };

//     if (formData.password === formData.confirmPassword) {
//       try {
//         const { data } = await createUser(formData);
//         notify('Done', `${data.firstName} ${data.lastName} has been created successfully`);
//       } catch (error) {
//         notify('Error', `${error.message}`, true);
//       }
//     } else {
//       notify('Error', `Passwords are not matched`, true);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <div className="mb-6 grid gap-6 md:grid-cols-2">
//         <Input name={ActionKind.firstName} title="First Name" placeholder="John" onChange={setFormData} />
//         <Input name={ActionKind.lastName} title="Last name" placeholder="Doe" onChange={setFormData} />
//         <Input name={ActionKind.company} title="Company" placeholder="Facebook" onChange={setFormData} />
//         <Input
//           onChange={setFormData}
//           name={ActionKind.phone}
//           title="Phone number"
//           placeholder="531 501 3673"
//           type="tel"
//           pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
//         />
//       </div>
//       <div className="mb-6">
//         <Input
//           name={ActionKind.email}
//           title="Email address"
//           placeholder="john.doe@company.com"
//           type="email"
//           onChange={setFormData}
//         />
//       </div>
//       <div className="mb-6">
//         <Input
//           name={ActionKind.password}
//           title="Password"
//           placeholder="•••••••••"
//           type="password"
//           onChange={setFormData}
//         />
//       </div>
//       <div className="mb-6">
//         <Input
//           name={ActionKind.confirmPassword}
//           title="Confirm password"
//           placeholder="•••••••••"
//           type="password"
//           onChange={setFormData}
//         />
//       </div>
//       <Checkbox name={ActionKind.isAdmin} title="Is Admin" onChange={setFormData} />
//       <div className="w-full">
//         <Button name="submit" title="Submit" type="submit" />
//       </div>
//     </form>
//   );
// };
