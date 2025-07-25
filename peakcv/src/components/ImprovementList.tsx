'use client';

interface ImprovementListProps {
    improvementsJson: string;
}

const ImprovementList = ({improvementsJson}: ImprovementListProps) => {
    const improvements = JSON.parse(improvementsJson);
    return (
        <></>
    );
}

export default ImprovementList;