import { React, useState } from "react";
import styles from "./styles.module.css";

const DeleteDoctor = ({ id, onClose }) => {
    const [errorMessage, setErrorMessage] = useState("")

    const handleDelete = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/medicos/excluir/" + id, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Erro ao excluir o médico.")
            }
            onClose()
        } catch (error) {
            setErrorMessage("Erro ao excluir o médico. Verifique os dados informados.")
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.primaryTitle}>Excluir médico</h1>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <div className={styles.textArea}>
                <p className={styles.paragraph}>Tem certeza de que deseja excluir o médico?</p>
                <div className={styles.buttonsArea}>
                    <button className={styles.primaryButton} onClick={handleDelete}>Excluir</button>
                    <button className={styles.primaryButton} onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDoctor
