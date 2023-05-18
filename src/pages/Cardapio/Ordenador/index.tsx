import styles from "./Ordenador.module.scss";
import opcoes from "./opcoes.json";
import React, { useState } from "react";
import classNames from "classnames";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

export type OpcoesOrdenador = {
  opcao: "" | "porcao" | "preco" | "qtd_pessoas"
}
interface Props {
  ordenador: OpcoesOrdenador,
  setOrdenador: React.Dispatch<React.SetStateAction<OpcoesOrdenador>>
}

export default function Ordenador({
  ordenador,
  setOrdenador
}: Props) {
  const [aberto, setAberto] = useState(false);
  const nomeOrdenador = ordenador.opcao && opcoes.find(opcao => opcao.value === ordenador.opcao)?.nome;
  return (
    <button
      className={classNames({
        [styles.ordenador]: true,
        [styles["ordenador--ativo"]]: ordenador.opcao !== ""
      })}
      onClick={() => setAberto(!aberto)}
      onBlur={() => setAberto(false)}
    >
      <span>{nomeOrdenador || "Ordenar Por"}</span>
      {aberto ? <MdKeyboardArrowUp size={20} /> : <MdKeyboardArrowDown size={20} />}
      <div className={classNames({
        [styles.ordenador__options]: true,
        [styles['ordenador__options--ativo']]: aberto
      })}>
        {opcoes.map(opcao => (
          <div className={styles.ordenador__option} key={opcao.value} onClick={(e) => {
            setOrdenador({
              opcao: opcao.value as OpcoesOrdenador['opcao'],
            })
          }}>
            {opcao.nome}
          </div>
        ))}
      </div>
    </button>
  )
}