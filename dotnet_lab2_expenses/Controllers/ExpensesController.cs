using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnet_lab2_expenses.Models;

namespace dotnet_lab2_expenses.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly ExpenseContext _context;

        public ExpensesController(ExpenseContext context)
        {
            _context = context;
        }

        // GET: api/Expenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseItemListView>>> GetExpenseItem(
            [FromQuery] DateTime? from = null,
            [FromQuery] DateTime? to = null,
            [FromQuery] string type = null)
        {
            IEnumerable<ExpenseItem> expenseItems = await _context.ExpenseItem.ToListAsync().ConfigureAwait(false);

            if (from != null)
            {
                expenseItems = expenseItems.Where(item => from <= item.Date);
            }
            if (to != null)
            {
                expenseItems = expenseItems.Where(item => item.Date <= to);
            }
            if (type != null)
            {
                expenseItems = expenseItems.Where(item => item.Type == type);
            }
            
            var listView = ExpenseItemListViewConverter.ConvertToListView(expenseItems);
            
            return Ok(listView);
        }

        // GET: api/Expenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExpenseItem>> GetExpenseItem(long id)
        {
            var expenseItem = await _context.ExpenseItem.FindAsync(id);

            if (expenseItem == null)
            {
                return NotFound();
            }

            return expenseItem;
        }

        // PUT: api/Expenses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpenseItem(long id, ExpenseItem expenseItem)
        {
            if (id != expenseItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(expenseItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Expenses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ExpenseItem>> PostExpenseItem(ExpenseItem expenseItem)
        {
            _context.ExpenseItem.Add(expenseItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExpenseItem", new { id = expenseItem.Id }, expenseItem);
        }

        // DELETE: api/Expenses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ExpenseItem>> DeleteExpenseItem(long id)
        {
            var expenseItem = await _context.ExpenseItem.FindAsync(id);
            if (expenseItem == null)
            {
                return NotFound();
            }

            _context.ExpenseItem.Remove(expenseItem);
            await _context.SaveChangesAsync();

            return expenseItem;
        }

        private bool ExpenseItemExists(long id)
        {
            return _context.ExpenseItem.Any(e => e.Id == id);
        }
    }
}
