using System.Security.Cryptography;

namespace walk_in_portal_api.Services
{
    public static class HashService
    {
        const int keySize = 64;
        public static byte[] salt = RandomNumberGenerator.GetBytes(keySize);
    }
}
