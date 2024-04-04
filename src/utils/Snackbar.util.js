// import { useSnackbar } from 'notistack';

// export const MESSAGE_VARIANT = {
//   ERROR: "error",
//   SUCCESS: "success",
//   WARN: "warning",
//   INFO: "info",
// };

// const SnackbarUtil = () => {
//   const { enqueueSnackbar } = useSnackbar();

//   const showSnackbar = (message, variant) => {
//     enqueueSnackbar(message, { variant });
//   };

//   return { showSnackbar };
// };

// export default SnackbarUtil;

import { useSnackbar } from 'notistack';

export const MESSAGE_VARIANT = {
    ERROR: "error",
    SUCCESS: "success",
    WARN: "warning",
    INFO: "info",
};

const SnackbarUtil = () => {
    const { enqueueSnackbar } = useSnackbar();

    const showSnackbar = (message, variant) => {
        enqueueSnackbar(message, { variant });
    };

    return { showSnackbar };
};

export default SnackbarUtil;


