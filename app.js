/*Ex.1
a)Napisz funkcję, która łączy dwie tablice przy pomocy wskazanej operacji - jako pierwszy parametr przyjmuje pewną funkcję dwuparametrową
i wypełnia tablicę wyjściową wynikiem wykonania tej funkcje na kolejnych elementach obu tablic.
Np. jeśli przekazano funkcję obliczającą sumę dwóch liczb oraz tablice [4, 5, 6] i [10, 20, 30], zostanie zwrócone [14, 25, 36]:
let wynik = combine((a,b)=>a+b, [4, 5, 6], [10, 20, 30])

b) Wypróbuj użycie tej funkcji do stworzenia tablicy punktów z dwóch tablic wypełnionych odpowiednio współrzędnymi x oraz y (czyli np. z tablic [1, 2, 3] oraz [7, 8, 9]
zostaną stworzone [{x:1,y:7}, {x:2,y:8}, {x:3,y:9}]).
c) Spróbuj napisać taką wersję tej funkcji, która może przyjąć dowolną liczbę tablic (oraz pewną funkcję przyjmującą liczbę parametrów równą liczbie tablic)
- wówczas np. przekazanie [1,2,3], [5,6,7] i [10,20,30] oraz funkcji dodającej trzy liczby zwróci [16,28,40]:
let wynik = combine((a,b,c)=>a+b+c, [1, 2, 3], [5, 6, 7], [10, 20, 30])*/

function combine(operationalFunction, array1, array2) {
    const resultArr = [];
    let howManyEl;
    if (array1.length > array2.length) {
        howManyEl = array2.length;
    } else {
        howManyEl = array1.length;
    }
    for (let i = 0; i < howManyEl; ++i) {
        resultArr.push(operationalFunction(array1.at(i), array2.at(i)));
    }
    return resultArr;
}

let wynik = combine((a, b) => a + b, [4, 5, 6], [10, 20, 30]);
console.log(wynik);

class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function combineV2(array1, array2) {
    const createCoordinates = (x, y) => new Coordinates(x, y);
    return combine(createCoordinates, array1, array2);
}

let wynikV2 = combineV2([4, 5, 6], [10, 20, 30]);
console.log(wynikV2);


function combineV3(operationalFunction, ...arrays) {
    const howManyEl = Math.min(...arrays.map(array => array.length));
    const resultArr = [];
    for (let i = 0; i < howManyEl; ++i) {
        resultArr.push(operationalFunction(...arrays.map(arr => arr.at(i))));
    }
    return resultArr;
}

let wynikV3 = combineV3((a, b, c) => a + b + c, [1, 2, 3], [5, 6, 7], [10, 20, 30])
console.log(wynikV3);

/*Ex.2
Napisz funkcję skarbonka, która jako parametry przyjmuje imię właściciela oraz stan (domyślna wartość parametru = 0).
Jako wynik funkcja zwraca kolejną funkcję. Jeśli wywołamy ją bez parametru, zwrócony zostanie aktualny stan skarbonki, zaś z parametrem liczbowym - stan zwiększy się o podaną wartość.
Ponadto do konsoli jest wypisywany aktualny stan i rodzaj wykonywanej operacji. Przetestuj działanie kilku niezależnych skarbonek.
Przykład:
let s = skarbonka("Piotr", 100)
s(20) // wypisuje "Piotr set 120"
let ile = s() // zwraca 120, wypisuje do konsoli "Piotr get 120"*/

function moneybox(firstName, startingBalance = 0) {
    let balance = startingBalance;
    return (income) => {
        if (isNaN(income)) {
            console.log(`${firstName} get ${balance}`);
            return balance;
        } else {
            balance += income;
            console.log(`${firstName} set ${balance}`);
        }
    }
}

let s = moneybox("Piotr", 100);
s(20);
let ile = s();

/*Ex.3
Na potrzeby tego zadania spreparuj listę studentów i zdobytych przez nich ocen. Powinna mieć ona taką formę:
[ { imię: "Piotr", nazwisko: "Nowak", punkty: 63 },
  { imię: "Tomasz", nazwisko: "Kowalski", punkty: 88 },
  { imię: "Julia", nazwisko: "Bagińska", punkty: 75 }, ... ]

Następnie wykonaj poniższe operacje nie posługując się pętlami, ale metodami tablic map, filter, reduce i sort:
    -znajdź średnią liczbę punktów
    -podaj imiona i nazwiska osób które zdobyły więcej niż średnia
    -wskaż imiona i nazwiska trzech osób, które zdobyły najwięcej punktów (nieco trudniejszy wariant: przynajmniej trzy osoby - jeśli więcej niż jedna zajmuje trzecią pozycję)
    -zwrócić listę nazwisk z ocenami posortowaną alfabetycznie wg nazwisk (przelicznik: 50 lub więcej punktów - ocena dst, 60 - dst+, 70 - db, 80 - db+, 90 - bdb)
    -policz ile osób zdobyło jaki stopień*/

console.log("------------------------");

class Student {
    constructor(firstName, secondName, points) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.points = points;
    }
}

function createStudentsList() {
    const studentsList = [];
    const student1 = new Student("Piotr", "Nowak", 63);
    const student2 = new Student("Tomasz", "Kowalski", 88);
    const student3 = new Student("Julia", "Bagińska", 91);
    const student4 = new Student("Damian", "Gudel", 85);
    const student5 = new Student("Dawid", "Brejnak", 85);
    studentsList.push(student1, student2, student3, student4, student5);
    return studentsList;
}

function getAverage(studentsList) {
    const initialValue = 0;
    const sumWithInitial = studentsList.reduce(
        (accumulator, student) => accumulator + student.points,
        initialValue,
    );
    return sumWithInitial / studentsList.length;
}

function getStudentsAboveAverage(studentsList, average) {
    return studentsList.filter((student) => student.points > average)
}

function getTopThreeStudents(studentsList) {
    const sortedStudentsList = studentsList.sort((s1, s2) => s2.points - s1.points);
    const topThree = sortedStudentsList.slice(0, 3);
    const thirdStudentScore = topThree[2].points;
    const additionalStudents = studentsList.filter(student => {
        return student.points === thirdStudentScore && !topThree.includes(student);
    });
    topThree.push(...additionalStudents);

    return topThree;
}

function getGrade(score) {
    switch (true) {
        case score >= 90:
            return 'bdb';
        case score >= 80:
            return 'db+';
        case score >= 70:
            return 'db';
        case score >= 60:
            return 'dst+';
        case score >= 50:
            return 'dst';
        default:
            return 'ndst';
    }
}

function getLastNamesWithGrades() {
    const sortedStudents = studentsList.slice().sort((a, b) => a.secondName.localeCompare(b.secondName));

    return sortedStudents.map(student => ({
        name: `${student.secondName}`,
        grade: getGrade(student.points)
    }));
}

function getGradesCount(studentsList) {
    let gradesStats = { bdb: 0, dbPlus: 0, db: 0, dstPlus: 0, dst: 0, ndst: 0 }
    gradesStats = studentsList
        .map(student => student.points)
        .reduce((gradesStats, score) => {
            switch (true) {
                case score >= 90:
                    ++gradesStats.bdb;
                    break;
                case score >= 80:
                    ++gradesStats.dbPlus;
                    break;
                case score >= 70:
                    ++gradesStats.db;
                    break;
                case score >= 60:
                    ++gradesStats.dstPlus;
                    break;
                case score >= 50:
                    ++gradesStats.dst;
                    break;
                default:
                    ++gradesStats.ndst;
                    break;
            }
            return gradesStats;
        }, gradesStats);
    return gradesStats;
}

const studentsList = createStudentsList();

const avgPoints = getAverage(studentsList);

const studentsAboveAverage = getStudentsAboveAverage(studentsList, avgPoints);

const topThreeStudents = getTopThreeStudents(studentsList);

const lastNamesWithGrades = getLastNamesWithGrades(studentsList);

const gradesStats = getGradesCount(studentsList);

console.log(studentsList);
console.log(avgPoints);
console.log(studentsAboveAverage);
console.log(topThreeStudents);
console.log(lastNamesWithGrades);
console.log(gradesStats);