const users = [{
  id: 1,
  name: 'Andrew',
  schoolId: 101
}, {
  id: 2,
  name: 'Mike',
  schoolId: 999
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 86
}, {
  id: 2,
  schoolId: 999,
  grade: 100
}, {
  id: 3,
  schoolId: 101,
  grade: 80
}];

const getUser = (id) => {

  return new Promise((resolve, reject) => {
    const user = users.find((user) => {
      return user.id === id;
    });

    if (user) {
      resolve(user);
    }
    else {
      reject(`Unable to find user with id ${id}.`);
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });
};

const getStatus = (userId) => {
  let user;
  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    // We don't have access to user inside this function
    // Find average
    //Return string
    let average = 0;
    if (grades.length > 0) {
      average = grades.map((grade) => grade.grade).reduce((a, b) => {
        return a + b;
      }) / grades.length;
    }

    return `Student ${user.id} has an average score of ${average}.`;
  });
};

// async await keywords

const getStatusAlt = async (userId) => {
//  throw new Error('This is an error.');
//  return 'Mike';
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  console.log(user, grades);
};

// Once we add async in front of the function, we are getting a Promise
// back that resolves the string.
// Regular functions return strings. Async functions always promises.
// The above function is similar to the below code.
// () => {
//   return new Promise((resolve, reject) => {
//     resolve('Mike');
//   });
// };

//console.log(getStatusAlt()); --> Returns Promise { Mike }

getStatusAlt(2).then((name) => {
  console.log(name);
}).catch((e) => {
  console.log(e);
});

getUser(2).then((user) => {
  console.log(user);
}).catch((e) => {
  console.log(e);
});

getGrades(101).then((grades) => {
  console.log(grades);
}).catch((e) => {
  console.log(e);
});

// getStatus(1).then((status) => {
//   console.log(status);
// }).catch((e) => {
//   console.log(e);
// });
