import React, { useState, useEffect } from "react";

const ModuleModal = ({ data, onSave, onClose, isAdding }) => {
  const [updatedData, setUpdatedData] = useState({ ...data });
  const [isFormValid, setIsFormValid] = useState(true);

  const formFields = [
    { label: "Nom de module", name: "nomModule", type: "text" },
    { label: "Spécialité", name: "specialite", type: "text" },
    {
      label: "Département",
      name: "departement",
      type: "dropdown",
      options: [
        "Département des Systèmes Informatiques (SIQ)",
        "Département de AI/ Science des Données",
      ],
    },
    {
      label: "Enseignant responsable",
      name: "enseignantResponsable",
      type: "text",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(updatedData).every(
      (field) => field.trim?.() !== ""
    );
    setIsFormValid(isValid);

    if (isValid) {
      onSave(updatedData);
    } else {
      alert("Tous les champs doivent être remplis.");
    }
  };

  useEffect(() => {
    setUpdatedData({ ...data });
  }, [data]);

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      width: "400px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    title: {
      marginBottom: "20px",
      textAlign: "center",
    },
    formField: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    dropdown: {
      width: "100%",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    inputError: {
      border: "1px solid red",
    },
    errorMessage: {
      color: "red",
      fontSize: "14px",
      marginBottom: "10px",
    },
    buttons: {
      display: "flex",
      justifyContent: "space-between",
    },
    button: {
      padding: "10px 15px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    saveButton: {
      backgroundColor: "#4CAF50",
      color: "#fff",
    },
    closeButton: {
      backgroundColor: "#f44336",
      color: "#fff",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <h3 style={styles.title}>
          {isAdding ? "Ajouter un module" : "Modifier le module"}
        </h3>
        <form onSubmit={handleSubmit}>
          {formFields.map((field, index) => (
            <div key={index} style={styles.formField}>
              <label style={styles.label}>{field.label}:</label>
              {field.type === "dropdown" ? (
                <select
                  name={field.name}
                  value={updatedData[field.name] || ""}
                  onChange={handleChange}
                  style={styles.dropdown}
                >
                  <option value="">Sélectionner</option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={updatedData[field.name] || ""}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(isFormValid ? {} : styles.inputError),
                  }}
                />
              )}
            </div>
          ))}
          {!isFormValid && (
            <p style={styles.errorMessage}>
              Tous les champs doivent être remplis.
            </p>
          )}
          <div style={styles.buttons}>
            <button
              type="submit"
              style={{ ...styles.button, ...styles.saveButton }}
            >
              Sauvegarder
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{ ...styles.button, ...styles.closeButton }}
            >
              Fermer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModuleModal;
