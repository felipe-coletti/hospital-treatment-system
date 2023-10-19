import { React, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import RegisterPatient from "../../components/RegisterPatient";

const ViewPatients = () => {
    const [patients, setPatients] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const consult = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/pacientes")
                if (!response.ok) {
                    throw new Error()
                }
                const data = await response.json()
                console.log(JSON.stringify(data))
                setPatients(data)
            } catch (error) {
                setErrorMessage(error.message)
            }
        }
        consult()
    }, [])

    const [registerPatient, setRegisterPatient] = useState(false)

    const showRegisterPatient = () => setRegisterPatient(!registerPatient)

    if (patients.length > 0) {
        return (
            <div className={styles.container}>
                <div className={styles.gridContainer}>
                    <div className={styles.grid}>
                        {patients.map((patient) => (
                            <Link to={`/patients/${patient.id}`} key={patient.id} className={styles.cardLink}>
                                <div className={styles.card}>
                                    {patient.nome}         
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={styles.buttonArea}>
                    <button className={styles.primaryButton} onClick={showRegisterPatient}>
                        Cadastrar paciente
                    </button>
                </div>
                {registerPatient && <RegisterPatient active={setRegisterPatient}/>}
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.contentArea}>
                    <p>Cadastre pacientes para visualiza-los aqui.</p>
                </div>
                <div className={styles.buttonArea}>
                    <button className={styles.primaryButton} onClick={showRegisterPatient}>
                        Cadastrar paciente
                    </button>
                </div>
                {registerPatient && <RegisterPatient active={setRegisterPatient}/>}
            </div>
        )
    }
}

export default ViewPatients
