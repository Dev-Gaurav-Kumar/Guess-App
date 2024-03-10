import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces")
    .required("Name is required"),
});

export const initialValues = {
  name: "",
};

export const fetchCountryData = async (name: string) => {
  const response = await fetch(`https://api.nationalize.io/?name=${name}`);
  return response.json();
};

export const fetchGenderData = async (name: string) => {
  const response = await fetch(`https://api.genderize.io/?name=${name}`);
  return response.json();
};

export const fetchAgeData = async (name: string) => {
  const response = await fetch(`https://api.agify.io/?name=${name}`);
  return response.json();
};
