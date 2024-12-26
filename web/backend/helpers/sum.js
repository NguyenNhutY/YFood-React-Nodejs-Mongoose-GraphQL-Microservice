import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Nhập số a: ', (inputA) => {
    const a = parseInt(inputA, 10);

    rl.question('Nhập số b: ', (inputB) => {
        const b = parseInt(inputB, 10);

        rl.question('Nhập số c: ', (inputC) => {
            const c = parseInt(inputC, 10);

            if (isNaN(a) || isNaN(b) || isNaN(c)) {
                console.log('Vui lòng nhập các số hợp lệ.');
            } else {
                const result = (a + 4 * b + c) / 6;
                console.log(`Kết quả của (a + 4b + c) / 6 là: ${result}`);
            }

            rl.close();
        });
    });
});
