import React from "react";
import Button from "../components/common/button";
import initialize from "../mockData/initializeData";

const RestoreDataBase = () => {
    return (
        <Button color="green" onClick={initialize}>
            Восстановить БД
        </Button>
    );
};

export default RestoreDataBase;
