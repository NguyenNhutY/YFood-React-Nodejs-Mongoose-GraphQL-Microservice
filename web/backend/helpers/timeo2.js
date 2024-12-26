import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Nhập số a: ', (inputA) => {
    const a = parseInt(inputA, 10);

    rl.question('Nhập số b: ', (inputB) => {
        const b = parseInt(inputB, 10);

        if (isNaN(a) || isNaN(b)) {
            console.log('Vui lòng nhập các số hợp lệ.');
        } else {
            const result = ((b - a) / 6) ** 2; // Sử dụng toán tử ** để tính bình phương
            console.log(`Kết quả của ((b - a) / 6)^2 là: ${result}`);
        }

        rl.close();
    });
});
