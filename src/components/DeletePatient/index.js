import { React, useState } from "react";
import styles from "./styles.module.css";
import { Icon } from '@iconify/react';

const DeletePatient = ({ id, onClose }) => {
    const closeByBackground = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    const closeByButton = () => {
        onClose();
    }

    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/pacientes/excluir/" + id, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Erro ao excluir o paciente.")
            }
            setMessage("Paciente excluido com sucesso!")
        } catch (error) {
            setMessage("Erro ao excluir o paciente. Verifique os dados informados.")
        }
    
        onClose();
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.shadow}></div>
            <div className={styles.mainContentArea}>
                <div className={styles.container} onClick={closeByBackground}>
                    <div className={styles.contentArea}>
                        <div className={styles.topArea}>
                            <button className={styles.button} onClick={closeByButton}>
                                <Icon icon="tabler:x" />
                            </button>
                        </div>
                        <h1 className={styles.primaryTitle}>Excluir paciente</h1>
                        {message && <p className={styles.errorMessage}>{message}</p>}
                        <div className={styles.textArea}>
                            <p className={styles.paragraph}>Tem certeza de que deseja excluir o paciente?</p>
                            <div className={styles.buttonsArea}>
                                <button className={styles.primaryButton} onClick={handleDelete}>Excluir</button>
                                <button className={styles.primaryButton} onClick={closeByButton}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeletePatient
