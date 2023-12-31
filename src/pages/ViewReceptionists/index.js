import { React, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import Modal from "../../components/Modal";
import RegisterReceptionist from "../../components/RegisterReceptionist";
import EditReceptionist from "../../components/EditReceptionist";
import DeleteReceptionist from "../../components/DeleteReceptionist";
import NavBar from "../../components/NavBar";

const ViewReceptionists = () => {
    const [receptionists, setReceptionists] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedAction, setSelectedAction] = useState(null)

    useEffect(() => {
        const consult = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/recepcionistas")
                if (!response.ok) {
                    throw new Error()
                }
                const data = await response.json()
                setReceptionists(data)
            } catch (error) {
                setErrorMessage("Erro ao exibir os dados dos recepcionistas.")
            }
        }
        consult()
    }, [])

    const openModal = (id, action) => {
        setSelectedItem(id)
        setSelectedAction(action)
    }

    const closeModal = () => {
        setSelectedItem(null)
        setSelectedAction(null)
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentArea}>
                <NavBar/>
                <h1 className={styles.primaryTitle}>Recepcionistas</h1>
                <div className={styles.optionsArea}>
                    <div className={styles.searchArea}>
                        <div className={styles.searchBar}>
                            <button title="Pesquisar" className={styles.searchIcon}>
                                <Icon icon="iconamoon:search-bold" />
                            </button>
                            <input id="search-input" className={styles.searchInput} placeholder="Pesquisar" />
                        </div>
                        <button className={styles.primaryButton}>
                            <Icon className={styles.icon} icon="ion:filter" />
                            Filtrar
                        </button>
                    </div>
                    <button className={styles.primaryButton} onClick={() => openModal(null, 'register')}>
                        <Icon className={styles.icon} icon="akar-icons:plus" />
                        Cadastrar recepcionista
                    </button>
                </div>
                {errorMessage === null ? (
                    receptionists.length > 0 ? (
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead className={styles.tableHeader}>
                                    <tr className={styles.tableRow}>
                                        <th className={styles.tableItem}><h2 className={styles.secondaryTitle}>#</h2></th>
                                        <th className={styles.tableItem}><h2 className={styles.secondaryTitle}>Nome</h2></th>
                                        <th className={styles.tableItem}><h2 className={styles.secondaryTitle}>CPF</h2></th>
                                        <th className={styles.tableItem}><h2 className={styles.secondaryTitle}>Ações</h2></th>
                                    </tr>
                                </thead>
                                <tbody className={styles.tableBody}>
                                    {receptionists.map((receptionist, i) => (
                                        <tr className={styles.tableRow} key={receptionist.id}>
                                            <td className={styles.tableItem}>
                                                <p className={styles.paragraph}>{i + 1}</p>
                                            </td>
                                            <td className={styles.tableItem}>
                                                <p className={styles.paragraph}>
                                                    <Link to={`/receptionists/${receptionist.id}`} className={styles.cardLink}>
                                                        {receptionist.nome}
                                                    </Link>
                                                </p>
                                            </td>
                                            <td className={styles.tableItem}>
                                                <p className={styles.paragraph}>{receptionist.cpf}</p>
                                            </td>
                                            <td className={styles.tableItem}>
                                                <div className={styles.actionsArea}>
                                                    <button title="Editar" className={styles.button} onClick={() => openModal(receptionist.id, 'edit')}>
                                                        <Icon icon="prime:pencil" />
                                                    </button>
                                                    <button title="Excluir" className={styles.button} onClick={() => openModal(receptionist.id, 'delete')}>
                                                        <Icon icon="ic:outline-delete" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className={styles.messageArea}>
                            <p className={styles.paragraph}>Cadastre recepcionistas para visualiza-los aqui.</p>
                        </div>
                    )
                ) : (
                    <div className={styles.messageArea}>
                        <p className={styles.errorMessage}>{errorMessage}</p>
                    </div>
                )}
                {selectedAction === 'register' && (
                    <Modal onClose={closeModal}>
                        <RegisterReceptionist onClose={closeModal} />
                    </Modal>
                )}
                {selectedItem !== null && (
                    <div>
                        {selectedAction === 'edit' && (
                            <Modal onClose={closeModal}>
                                <EditReceptionist id={selectedItem} onClose={closeModal} />
                            </Modal>
                        )}
                        {selectedAction === 'delete' && (
                            <Modal onClose={closeModal}>
                                <DeleteReceptionist id={selectedItem} onClose={closeModal} />
                            </Modal>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewReceptionists
