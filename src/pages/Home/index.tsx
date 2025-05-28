import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from 'phosphor-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from './styles';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe o nome do projeto'),
  minutesAmount: zod.number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60,' O ciclo precisa ser de no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

export const Home = () => {

  const [cycles, setCycle] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null); 

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });

  function handleCreateNewCycle(data: NewCycleFormData){
    const id =  String(new Date().getTime());

    // Seta a nova o novo Ciclo em uma variável tipada
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount
    };

    // atualiza a lista, adicionando o novo valor
    setCycle([...cycles, newCycle]);
    // Poderia ser feito da forma abaixo: 
    // setCycle((currentState) => [...currentState, newCycle]);

    // limpa o campo
    reset();
  }


  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  console.log(activeCycle);

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task"
            list="task-sugestion"
            type="text" 
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-sugestion">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount" 
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true, })}
          />

          <span>minutos.</span>
        </FormContainer>
      
        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />  
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
};
