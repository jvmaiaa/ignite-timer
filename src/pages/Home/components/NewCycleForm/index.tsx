import * as S from './styles';

export const NewCycleForm = () => {
  return (
    <div>
      <S.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <S.TaskInput 
            id="task"
            list="task-sugestion"
            type="text" 
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activeCycle}
            {...register('task')}
          />

          <datalist id="task-sugestion">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <S.MinutesAmountInput
            type="number"
            id="minutesAmount" 
            placeholder="00"
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true, })}
          />

          <span>minutos.</span>
        </S.FormContainer>
    </div>

  );
};