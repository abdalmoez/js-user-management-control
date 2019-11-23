# JS User Management!

This project is composed of the following pages:
- **Sign Up**:
Sign up page allows new users to register into the system to allow them full access of the available functions in this project. This pages contains a registration form for the user model. Each user should respect all the mentioned constraints instead to got registered. When the user write all the 8 digits of his number it must display the respective operator accordingly. After successful registration the user will be redirected to a dashboard page. All the fields are required.

	*Model User:*
	>    First name: Text Minimum length 3\
	     Last name: Text Minimum length 3\
	     Phone: 8 digits\
	     State: Dropdown list (Data exist in localstorage)\
	     Birthday: date (Minimum age 10)\
	     Email: Text (Email format)\
	     Password: Text (8 chars)

- **Login**:
In the login page, the user must enter his phone number and his password in order to login to his already registered accounts. The user will got only three attemps before he will be blocked.

	*FormControl:*
	>    Phone: 8 digits\
	     Password: Text (8 chars)

