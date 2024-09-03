import React, { useState } from 'react';

interface AddNodeFormProps {
    addNode: (word: string, depth: number) => void;
}

const AddNodeForm: React.FC<AddNodeFormProps> = ({ addNode }) => {
    const [word, setWord] = useState('');
    const [depth, setDepth] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (word && depth) {
            addNode(word, depth);
            setWord('');
            setDepth(1);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Nova palavra"
                required
            />
            <input
                type="number"
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value))}
                placeholder="Profundidade"
                min="1"
                required
            />
            <button type="submit">Adicionar Nó</button>
        </form>
    );
};

export default AddNodeForm;
