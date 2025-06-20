import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInSeconds } from 'date-fns';
import { HandPalm, Play } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { CountDownContainer } from './components/CountDown/styles';
import { NewCycleForm } from './components/NewCycleForm';
import { HomeContainer, StartCountDownButton, StopCountDownButton } from './styles';

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
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export const Home = () => {

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(), 
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          setCycles((currentState) => 
            currentState.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };  
              } else {
                return cycle;
              }
            })
          );

          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
        
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

  function handleCreateNewCycle(data: NewCycleFormData){
    const id =  String(new Date().getTime());

    // Seta a nova o novo Ciclo em uma variável tipada
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(), // horário que o ciclo foi iniciado
    };

    // atualiza a lista, adicionando o novo valor
    setCycles((currentState) => [...currentState, newCycle]);
    // Poderia ser feito da forma abaixo: 
    // setCycle([...cycles, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    // limpa o campo
    reset();
  }

  function handleInterruptCycle() {
    // interreompendo o ciclo ativo e seta a data que ele foi interrompido
    setCycles((currentState) => 
      currentState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    );
    setActiveCycleId(null);
  }

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60); 
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <NewCycleForm />
        <CountDownContainer />
        

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={() => { handleInterruptCycle(); }}>
            <HandPalm size={24} />  
            Interromper
          </StopCountDownButton>
          ) : 
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />  
            Começar
          </StartCountDownButton>
        }
      </form>
    </HomeContainer>
  );
};
