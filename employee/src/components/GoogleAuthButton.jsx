// import { useGoogleLogin } from '@react-oauth/google';
// import { FcGoogle } from 'react-icons/fc';

// const GoogleAuthButton = ({ text = "Continue with Google", onSuccess }) => {
//   const login = useGoogleLogin({
//     onSuccess: tokenResponse => {
//       console.log(tokenResponse);
//       // Send this token to your backend for verification and user creation/login
//       if (onSuccess) onSuccess(tokenResponse);
//     },
//     onError: error => console.log('Login Failed:', error)
//   });

//   return (
//     <button
//       type="button"
//       onClick={() => login()}
//       className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center transition-colors hover:cursor-pointer hover:bg-gray-200"
//     >
//       <FcGoogle className="text-xl mr-2" />
//       {text}
//     </button>
//   );
// };

// export default GoogleAuthButton;