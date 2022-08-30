const setUtil = {
  // 기존 값과 새로운 값을 비교하여 수정된 내용만 반환
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
