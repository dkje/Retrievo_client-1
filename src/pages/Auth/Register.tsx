import { Box } from "@chakra-ui/react";
import React from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";
import InputField from "../../components/Input";
import Heading, { headingEnum } from "../../components/Heading";
import Form from "../../components/Form";
import RoundButton, {
  IconType,
  ShadowType,
  RoundButtonColor,
} from "../../components/RoundButton";
import { useRegisterMutation } from "../../generated/graphql";
import useProjectRoute from "./useProjectRoute";
import IconButton, { IconButtonType } from "../../components/IconButton";
import ROUTES from "../../utils/RoutePath";

export type RegisterPropsType = {
  sample?: string;
};

const Register: React.FC<RegisterPropsType> = () => {
  const { routeToProject } = useProjectRoute();

  const initialValue = {
    username: "",
    email: "",
    password: "",
    confirm: "",
  };

  const validationSchema = yup.object({
    password: yup.string().min(6).required(),
    email: yup.string().email().required(),
    username: yup.string().min(3).max(20).required(),
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const [register] = useRegisterMutation();

  const handleRegister = async (
    value: Record<string, any>,
    { setFieldError }: any
  ) => {
    const { username, email, password } = value;
    const response = await register({
      variables: { options: { username, email, password, projectId: null } },
    });
    if (response.data?.register.error?.message) {
      setFieldError(
        response.data.register.error.field,
        response.data.register.error.message
      );
    } else if (response.data?.register.user) {
      routeToProject();
    }
    console.log(response);
  };

  return (
    <Box
      bgColor="white"
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      position="relative"
    >
      <Heading headingType={headingEnum.auth}>Register</Heading>
      <Box w="70%">
        <Box position="absolute" top="0" left="0">
          <Link to={ROUTES.LANDING}>
            <IconButton
              size="lg"
              color="achromatic.700"
              aria-label="back to home"
              iconButtonType={IconButtonType.close}
            />
          </Link>
        </Box>
        <Form
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
          isSubmitButton
          isFullButton
          submitBtnName="Sign in"
        >
          <InputField label="Name" name="username" placeholder="Name" />
          <InputField
            label="Email"
            name="email"
            type="email"
            iconType="email"
            placeholder="Email"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            iconType="password"
            placeholder="Password"
          />
          <InputField
            label="Confirm Password"
            name="confirm"
            type="password"
            iconType="password"
            placeholder="Password"
          />
        </Form>
        <Box display="flex" justifyContent="center" alignItems="center" mt={7}>
          <a href="https://retrievo.io/auth/google">
            <RoundButton
              aria-label="google login button"
              iconType={IconType.google}
              shadowType={ShadowType.base}
              buttonColor={RoundButtonColor.white}
              size="md"
              variant="outline"
              mr={2}
            />
          </a>
          <a href="https://retrievo.io/auth/github">
            <RoundButton
              aria-label="google login button"
              iconType={IconType.github}
              shadowType={ShadowType.base}
              buttonColor={RoundButtonColor.white}
              size="md"
              variant="outline"
            />
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
