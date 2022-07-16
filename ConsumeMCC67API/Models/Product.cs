using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConsumeMCC67API.Models
{
	public class Product
	{
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Kolom nama harus diisi !")]
        [StringLength(25)]
        [MinLength(6)]
        [MaxLength(25)]
        public string Name { get; set; }

        public Supplier Supplier { get; set; }

        [ForeignKey("Supplier")]
        public int SupplierId { get; set; }
    }
}
