import java.util.Scanner;

public class example {

    public static boolean isPrime(int number) {
        if (number <= 1) {
            return false;
        }
        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int round = scanner.nextInt();
        String[] str = new String[round];
        for (int i = 0; i < round; i++) {
            int num = scanner.nextInt();
            if (isPrime(num)) {
                str[i] = "Is Prime";
            } else {
                str[i] = "Not Prime";
            }
        }
        for (int i = 0; i < round; i++) {
            System.out.println(str[i]);
        }
    }
}
