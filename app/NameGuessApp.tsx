"use client"
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import styles from '../styles/Home.module.css';
import {fetchCountryData,fetchAgeData,fetchGenderData, initialValues, validationSchema} from '../factory/services/nameGuessAppService';
import {Result} from '../models/nameGuessAppModel';

const NameGuessApp: React.FC = () => {
  const [result, setResult] = useState<Result | null>(null);

const handleSubmit = async (values: { name: string }) => {
    try {
      const [countryData, genderData, ageData] = await Promise.all([
        fetchCountryData(values.name),
        fetchGenderData(values.name),
        fetchAgeData(values.name),
      ]);

      setResult({
        country: countryData.country[0].country_id,
        gender: genderData.gender,
        age: ageData.age,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    return (
        <div className={styles.container}>
          <h1 className={styles.title}>Guess Application</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {() => (
              <Form className={styles.form}>
                <div className={styles.label}>
                  <label htmlFor="name">Enter Name:</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="E.g. Gaurav"
                    className={styles.input}
                  />
                  <ErrorMessage name="name" component="div" className={styles.error} />
                </div>
                <button type="submit" className={styles.button}>
                  Guess
                </button>
              </Form>
            )}
          </Formik>
          {result && (
            <div className={styles.result}>
              <p>Country: {result.country}</p>
              <p>Gender: {result.gender}</p>
              <p>Age: {result.age}</p>
            </div>
          )}
        </div>
      );
};

export default NameGuessApp;
