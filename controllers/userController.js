/* globalRoutes */
export const joinController = (req, res) => res.send("join");
export const loginController = (req, res) => res.send("login");
export const logoutController = (req, res) => res.send("logout");

/* userRoutes */
export const usersController = (req, res) => res.send('users');
export const userDetailController = (req, res) => res.send('userDetail');
export const editProfileController = (req, res) => res.send('editProfile');
export const changePasswordController = (req, res) => res.send('changePassword');
