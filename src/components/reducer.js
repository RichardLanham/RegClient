const fields = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  student: false,
  housing: false,
  dietary: "omnivore",
  price: 130,
  unit_amount: 130,
  quantity: 1,
  name: "dance-admission",
  event: "Weekend",
};

export const initialFieldsState = [fields];

export function fieldsReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD": {
      console.log("Update_Field");
      const { index, name, value } = action.payload;
      const newFields = [...state];
      newFields[index] = {
        ...newFields[index],
        [name]: value,
      };
      return newFields;
    }
    case "ADD_NEW_FIELD": {
      const { field } = action.payload;
      return [...state, field];
    }
    case "ADD_FIELD": {
      return [
        ...state,
        fields,
        // {
        //   firstname: "",
        //   lastname: "",
        //   email: "",
        //   phone: "",
        //   student: false,
        //   housing: false,
        //   dietary: "omnivore",
        //   price: 120,
        //   event: "Weekend",
        // },
      ];
    }
    case "REMOVE_FIELD": {
      return state.filter((_, idx) => idx !== action.index);
    }
    default:
      return state;
  }
}
