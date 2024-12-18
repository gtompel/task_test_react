'use client';
import type { NextPage } from 'next';
import { useState } from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: string[];
}

interface Props {
  params: Param[];
  model: Model;
}

const TextInput: React.FC<{
  param: Param;
  value: string;
  onChange: (paramId: number, value: string) => void;
}> = ({ param, value, onChange }) => {
  return (
    <div className="flex items-center mb-4">
      <label htmlFor={`input-${param.id}`} className="w-40 text-right mr-2">{param.name}</label>
      <input
        id={`input-${param.id}`}
        type="text"
        value={value}
        onChange={(e) => onChange(param.id, e.target.value)}
        className="flex-grow border border-gray-300 p-2 rounded"
      />
    </div>
  );
};

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [localModel, setLocalModel] = useState<Model>(model);

  const handleParamChange = (paramId: number, value: string) => {
    setLocalModel((prevModel) => {
      const newParamValues = prevModel.paramValues.map((pv) =>
        pv.paramId === paramId ? { ...pv, value } : pv
      );
      return { ...prevModel, paramValues: newParamValues };
    });
  };

  const getModel = () => localModel;

  return (
    <div className="max-w-lg mx-auto p-4 border border-gray-200 rounded-lg">
      {params.map((param) => {
        const value =
          localModel.paramValues.find((pv) => pv.paramId === param.id)?.value || '';
        return (
          <TextInput
            key={param.id}
            param={param}
            value={value}
            onChange={handleParamChange}
          />
        );
      })}
      <button
        onClick={() => alert(JSON.stringify(getModel(), null, 2))}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Получить модель
      </button>
    </div>
  );
};

const Home: NextPage = () => {
  const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
  ];

  const initialModel: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
    colors: [],
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">Редактор параметров</h1>
      <ParamEditor params={params} model={initialModel} />
    </div>
  );
};

export default Home;
