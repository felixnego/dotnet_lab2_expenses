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
        /// <summary>
        /// Get a list of all Expense Items in their DTO format.
        /// In the list view, certain fields are excluded.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseItemListView>>> GetExpenseItem(
            [FromQuery] DateTime? from = null,
            [FromQuery] DateTime? to = null,
            [FromQuery] string type = null)
        {
            IEnumerable<ExpenseItem> expenseItems = await _context.ExpenseItem.Include(ei => ei.Comments).ToListAsync();

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
        /// <summary>
        /// Get the details on one particular Expense Item.
        /// In the details view, all fields are included.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>The Expense Item requested</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ExpenseItem>> GetExpenseItem(long id)
        {
            var expenseItem = await _context.ExpenseItem.Include(e => e.Comments).SingleOrDefaultAsync(e => e.Id == id);

            if (expenseItem == null)
            {
                return NotFound();
            }

            return expenseItem;
        }


        // PUT: api/Expenses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        /// <summary>
        /// Update an Expense Item.
        /// </summary>
        /// <returns>The updated Expense Item</returns>
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
        /// <summary>
        /// Create a new Expense Item.
        /// </summary>
        /// <returns>The created Expense Item</returns>
        [HttpPost]
        public async Task<ActionResult<ExpenseItem>> PostExpenseItem(ExpenseItem expenseItem)
        {
            _context.ExpenseItem.Add(expenseItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExpenseItem", new { id = expenseItem.Id }, expenseItem);
        }

        /// <summary>
        /// Add a new Comment to a particular Expense Item.
        /// </summary>
        /// <returns>Ok if the operation performed successfully</returns>
        [HttpPost("{id}/comments")]
        public async Task<ActionResult<Comment>> PostComment(long id, Comment comment)
        {
            _context.Comment.Add(comment);
            await _context.SaveChangesAsync();

            var UpdatedExpenseItem = await _context.ExpenseItem.FindAsync(id);

            UpdatedExpenseItem.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok();
        }


        /// <summary>
        /// Update an existing comment for a particular Expense Item.
        /// </summary>
        /// <returns>Ok if the operation performed successfully</returns>
        [HttpPut("{id}/comments/{commentId}")]
        public async Task<IActionResult> PutComment(long id, long commentId, Comment comment)
        {
            if (commentId != comment.Id)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;

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

            return Ok(comment);
        }

        // DELETE: api/Expenses/5
        /// <summary>
        /// Deletes an Expense Item.
        /// </summary>
        /// <returns>The deleted Expense Item</returns>
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

        /// <summary>
        /// Deletes the comment associated with a particular Expense Item.
        /// </summary>
        /// <returns>The deleted comment</returns>
        [HttpDelete("{id}/comments/{commentId}")]
        public async Task<ActionResult<Comment>> DeleteComment(long id, long commentId)
        {
            var comment = await _context.Comment.FindAsync(commentId);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comment.Remove(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        private bool ExpenseItemExists(long id)
        {
            return _context.ExpenseItem.Any(e => e.Id == id);
        }
    }
}
