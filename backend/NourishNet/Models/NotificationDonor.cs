﻿using System.ComponentModel.DataAnnotations.Schema;

namespace NourishNet.Models
{
    public class NotificationDonor
    {
        public int Id { get; set; }
        public string DonorId { get; set; }
        [ForeignKey("DonorId")]
        public Donor Donor { get; set; }
        public string Description { get; set; }
        public string CreatedDate { get; set; }
        public string Createtime { get; set; }

    }
}
