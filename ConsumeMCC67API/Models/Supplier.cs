using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ConsumeMCC67API.Models
{
    public class Supplier
    {
        [Key]
		[JsonPropertyName("id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Nama Supplier Harus Diisi !")]
        [StringLength(25)]
        [MinLength(6, ErrorMessage = "Minimum panjang karakter adalah 6")]
        [MaxLength(25, ErrorMessage = "Maksimum panjang karakter adalah 25")]
		[JsonPropertyName("name")]        
        public string Name { get; set; }
    }
}
