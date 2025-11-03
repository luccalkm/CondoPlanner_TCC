using System.Security.Cryptography;

namespace Shared.Helpers
{
    public static class PasswordHasherHelper
    {
        private const int SaltSize = 16;
        private const int KeySize = 32;
        private const int MinIterations = 100_000;
        private const int MaxIterations = 200_000;

        public static string HashPassword(string password)
        {
            using var rng = RandomNumberGenerator.Create();
            var salt = new byte[SaltSize];
            rng.GetBytes(salt);

            int iterations = RandomNumberGenerator.GetInt32(MinIterations, MaxIterations + 1);

            var hash = GetHash(password, salt, iterations);

            return $"{iterations}.{Convert.ToBase64String(salt)}.{Convert.ToBase64String(hash)}";
        }

        public static bool VerifyPassword(string password, string storedHash)
        {
            try
            {
                var parts = storedHash.Split('.', 3);
                if (parts.Length != 3)
                    return false;

                var iterations = Convert.ToInt32(parts[0]);
                var salt = Convert.FromBase64String(parts[1]);
                var hash = Convert.FromBase64String(parts[2]);

                var inputHash = GetHash(password, salt, iterations);

                return CryptographicOperations.FixedTimeEquals(hash, inputHash);
            }
            catch
            {
                return false;
            }
        }

        private static byte[] GetHash(string password, byte[] salt, int iterations)
        {
            using var pbkdf2 = new Rfc2898DeriveBytes(
                password,
                salt,
                iterations,
                HashAlgorithmName.SHA256);

            return pbkdf2.GetBytes(KeySize);
        }
    }
}
