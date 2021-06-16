const initialState = {
  id: '',
  title: '',
  description: '',
  fee: 0,
  image: '',
  // response: {},
};

interface StateType {
  id?: string;
  title: string;
  description: string;
  fee: number;
  image: string;
}

interface ActionsParamType {
  setCourse: StateType;
  setTitle: string;
  setDescription: string;
  setFee: number;
  setImage: string;
  clear: undefined;
} // You only need to tag the type of params here !

const model: ModelType<StateType, ActionsParamType> = {
  actions: {
    setTitle: async (payload, _) => {
      return {
        title: payload,
      };
    },
    setDescription: async (payload, _) => {
      return {
        description: payload,
      };
    },
    setFee: async (payload, _) => {
      return {
        fee: payload,
      };
    },
    setImage: async (payload, _) => {
      return {
        image: payload,
      };
    },
    setCourse: async (payload, { actions }) => {
      await actions.setTitle(payload.title);
      await actions.setDescription(payload.description);
      await actions.setFee(payload.fee);
      await actions.setImage(payload.image);
    },
    clear: async (_, { actions }) => {
      await actions.setTitle(initialState.title);
      await actions.setDescription(initialState.description);
      await actions.setFee(initialState.fee);
      await actions.setImage(initialState.image);
    },
  },
  state: initialState,
};

export default model;

// You can use these types when use Class Components.
type ConsumerActionsType = getConsumerActionsType<typeof model.actions>;
type ConsumerType = { actions: ConsumerActionsType; state: StateType };
type ActionType = ConsumerActionsType;
export type { ConsumerType, StateType, ActionType };
// export { ConsumerType, StateType, ActionType };
