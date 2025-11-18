import gspread
import json
import os
import re
from collections import Counter
from datetime import datetime

def authenticate_google_sheets():
    """Authenticate with Google Sheets API using service account credentials."""
    credentials_json = os.environ.get('GOOGLE_SHEETS_CREDENTIALS')
    if not credentials_json:
        raise ValueError("GOOGLE_SHEETS_CREDENTIALS not found in environment variables")
    
    credentials = json.loads(credentials_json)
    gc = gspread.service_account_from_dict(credentials)
    return gc

def analyze_responses(worksheet):
    """Analyze form responses and calculate stats."""
    try:
        records = worksheet.get_all_records()
        if not records:
            return get_empty_stats()
        
        total_responses = len(records)
        correct_location = 0
        correct_password = 0
        both_correct = 0
        
        location_answers = []
        password_answers = []
        latest_solver = None
        
        # Define correct answers (case-insensitive)
        correct_location_answers = ['pc4', 'PC4', 'Pc4', 'pC4']
        correct_password_answers = ['video', 'VIDEO', 'Video', 'ViDeO', 'vIdEo']
        
        for record in records:
            # Extract answers (adjust column names based on your form)
            location_answer = record.get('Location (3 characters)', '').strip()
            password_answer = record.get('Password (5 characters)', '').strip()
            timestamp = record.get('Timestamp', '')
            
            location_answers.append(location_answer)
            password_answers.append(password_answer)
            
            # Check if answers are correct
            location_correct = location_answer in correct_location_answers
            password_correct = password_answer in correct_password_answers
            
            if location_correct:
                correct_location += 1
            if password_correct:
                correct_password += 1
            if location_correct and password_correct:
                both_correct += 1
                if not latest_solver:  # First correct solver found (newest)
                    latest_solver = timestamp
        
        # Calculate stats
        success_rate = (both_correct / total_responses) * 100 if total_responses > 0 else 0
        
        # Find most common wrong answers
        wrong_locations = [ans for ans in location_answers if ans not in correct_location_answers]
        wrong_passwords = [ans for ans in password_answers if ans not in correct_password_answers]
        
        most_common_wrong_location = Counter(wrong_locations).most_common(1)
        most_common_wrong_password = Counter(wrong_passwords).most_common(1)
        
        return {
            'total_detectives': total_responses,
            'success_rate': round(success_rate, 1),
            'correct_location': correct_location,
            'correct_password': correct_password,
            'both_correct': both_correct,
            'most_common_wrong_location': most_common_wrong_location[0][0] if most_common_wrong_location else 'N/A',
            'most_common_wrong_password': most_common_wrong_password[0][0] if most_common_wrong_password else 'N/A',
            'latest_solver': parse_timestamp(latest_solver) if latest_solver else 'None yet'
        }
        
    except Exception as e:
        print(f"Error analyzing responses: {e}")
        return get_empty_stats()

def get_empty_stats():
    """Return empty stats when no data is available."""
    return {
        'total_detectives': 0,
        'success_rate': 0,
        'correct_location': 0,
        'correct_password': 0,
        'both_correct': 0,
        'most_common_wrong_location': 'N/A',
        'most_common_wrong_password': 'N/A',
        'latest_solver': 'None yet'
    }

def parse_timestamp(timestamp_str):
    """Parse Google Forms timestamp and return a readable format."""
    try:
        # Google Forms typically returns timestamps like "10/25/2023 14:30:15"
        dt = datetime.strptime(timestamp_str, "%m/%d/%Y %H:%M:%S")
        return dt.strftime("%m/%d/%Y")
    except:
        return timestamp_str

def update_readme_stats(stats):
    """Update the stats section in README.md."""
    try:
        with open('README.md', 'r') as file:
            content = file.read()
        
        # Prepare new stats content
        new_stats = f"""<!-- STATS START -->
**🕵️ Total Detectives:** {stats['total_detectives']}  
**✅ Success Rate:** {stats['success_rate']}%  
**🎯 Location Accuracy:** {stats['correct_location']}/{stats['total_detectives']}  
**🔐 Password Accuracy:** {stats['correct_password']}/{stats['total_detectives']}  
**⚡ Most Common Wrong Location:** {stats['most_common_wrong_location']}  
**🔑 Most Common Wrong Password:** {stats['most_common_wrong_password']}  
**🏆 Latest Solver:** {stats['latest_solver']}  

*Stats updated: {datetime.now().strftime('%Y-%m-%d %H:%M UTC')}*
<!-- STATS END -->"""
        
        # Replace stats section
        pattern = r'<!-- STATS START -->.*?<!-- STATS END -->'
        new_content = re.sub(pattern, new_stats, content, flags=re.DOTALL)
        
        with open('README.md', 'w') as file:
            file.write(new_content)
        
        print("✅ README.md stats updated successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error updating README: {e}")
        return False

def main():
    """Main function to fetch data and update stats."""
    try:
        print("🔍 Fetching detective stats...")
        
        # Authenticate and get spreadsheet
        gc = authenticate_google_sheets()
        spreadsheet_id = os.environ.get('SPREADSHEET_ID')
        if not spreadsheet_id:
            raise ValueError("SPREADSHEET_ID not found in environment variables")
        
        spreadsheet = gc.open_by_key(spreadsheet_id)
        worksheet = spreadsheet.sheet1  # First sheet contains form responses
        
        # Analyze responses
        stats = analyze_responses(worksheet)
        
        print(f"📊 Stats calculated:")
        print(f"   Total Detectives: {stats['total_detectives']}")
        print(f"   Success Rate: {stats['success_rate']}%")
        print(f"   Both Correct: {stats['both_correct']}")
        
        # Update README
        if update_readme_stats(stats):
            print("🎉 Detective leaderboard updated!")
        else:
            print("❌ Failed to update leaderboard")
            
    except Exception as e:
        print(f"❌ Error in main process: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
