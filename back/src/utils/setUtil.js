const setUtil = {
  compareValues: (updateData, originData) => {
    let toUpdate = {};

    Object.entries(updateData).forEach((element) => {
      if (element[1] !== originData[element[0]])
        toUpdate[element[0]] = element[1];
    });
    return toUpdate;
  },
};

export default setUtil;
