namespace Domain.Common
{
    public class CommonTrackedEntity<T>
    {
        public int Id { get; set; }
        public DateTime CreationTime { get; set; }
        public int CreatorUserId { get; set; }

    }
}
